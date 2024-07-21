export default function template(library, game) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>litecanvas Editor</title>
    <style>
      html, body {height: 100%;}
      body {margin: 0}
      #err {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: blue;
        color: white;
        font-weight: bold;
        font-family: monospace;
        padding: 1em;
        font-size: 32px;
        z-index: 1000;
        box-sizing: border-box;
        line-height: 1.5;
      }

      #err-tip {
        font-family: sans-serif;
        font-weight: normal;
        opacity: 90%;
        font-size: 20px;
      }

      #err-tip code {
        background: rgba(0,0,0,.2);
      }

      canvas {
        background-image: repeating-conic-gradient(#fefefe 0% 25%, #ddd 0% 50%);
        background-position: 0 0, 0px 0px;
        background-size: 48px 48px;
      }
    </style>
  </head>
  <body>
    <div id="err" style="display:none">
      <p id="err-tip">Tip: If you are loading any asset (script, font, image etc), don't forget to add <code>if (LOADING > 0) return;</code> at the beginning of your <code>update</code> and <code>draw</code> functions.</p>
    </div>
    <script>
      // blue screen of death
      handleError=e=>{console.log(e),err.prepend(e.message||e.reason),err.style.display='block'};
      addEventListener('error',handleError);addEventListener('unhandledrejection',handleError);
    </script>
    <script>${library}</script>
    <script>
      ((lc) => {
        window.litecanvas = (config = {}) => {
          let instance = lc(config);
          instance.use(pluginAssetLoader);
          return instance;
        };
      })(window.litecanvas);
    </script>
    <script>${game}</script>
  </body>
</html>`;
}
