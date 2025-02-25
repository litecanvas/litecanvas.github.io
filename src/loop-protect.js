/**
 * Based on https://github.com/jsbin/loop-protect/blob/master/lib/index.js | License: http://jsbin.mit-license.org
 */
const generateBefore = (t, id) =>
  t.variableDeclaration("let", [
    t.variableDeclarator(
      id,
      t.callExpression(
        t.memberExpression(t.identifier("Date"), t.identifier("now")),
        []
      )
    ),
  ]);

const generateInside = ({ t, id, line, ch, timeout, extra } = {}) => {
  return t.ifStatement(
    t.binaryExpression(
      ">",
      t.binaryExpression(
        "-",
        t.callExpression(
          t.memberExpression(t.identifier("Date"), t.identifier("now")),
          []
        ),
        id
      ),
      t.numericLiteral(timeout)
    ),
    t.throwStatement(t.stringLiteral("Potential infinite loop"))
  );
};

const protect = (t, timeout, extra) => (path) => {
  if (!path.node.loc) {
    return;
  }
  const id = path.scope.generateUidIdentifier(randomString(16));
  const before = generateBefore(t, id);
  const inside = generateInside({
    t,
    id,
    line: path.node.loc.start.line,
    ch: path.node.loc.start.column,
    timeout,
    extra,
  });
  const body = path.get("body");

  // if we have an expression statement, convert it to a block
  if (!t.isBlockStatement(body)) {
    body.replaceWith(t.blockStatement([body.node]));
  }
  path.insertBefore(before);
  body.unshiftContainer("body", inside);
};

export default (timeout = 100, extra = null) => {
  if (typeof extra === "string") {
    const string = extra;
    extra = `() => console.error("${string.replace(/"/g, '\\"')}")`;
  } else if (extra !== null) {
    extra = extra.toString();
    if (extra.startsWith("function (")) {
      // fix anonymous functions as they'll cause
      // the callback transform to blow up
      extra = extra.replace(/^function \(/, "function callback(");
    }
  }

  return ({ types: t, transform }) => {
    const node = extra
      ? transform(extra, { ast: true }).ast.program.body[0]
      : null;

    let callback = null;
    if (t.isExpressionStatement(node)) {
      callback = node.expression;
    } else if (t.isFunctionDeclaration(node)) {
      callback = t.functionExpression(null, node.params, node.body);
    }

    return {
      visitor: {
        WhileStatement: protect(t, timeout, callback),
        ForStatement: protect(t, timeout, callback),
        DoWhileStatement: protect(t, timeout, callback),
      },
    };
  };
};

function randomString(length) {
  const result = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let counter = 0; counter < length; counter++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
