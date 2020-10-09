export const buildHtml = ({
  title,
  styleTags = "",
  bundles = [],
  linkTags = "",
  scriptElements = [],
  includeScripts = true,
  rootId = "root",
  basePath = false,
  bundlesPath = "/",
}) => {
  const _title_ = title;
  const bundleTags = bundles.map(
    (bundle) => `<script src="${bundlesPath}${bundle}" defer></script>`
  );
  const _bundle_tags_ = includeScripts ? bundleTags.join("\n") : ``;
  const _script_elements_ = includeScripts ? scriptElements.join("\n") : ``;
  return `
    <html>
      <head>
          <title>${_title_}</title>
          ${basePath ? `<base href="${basePath}">` : ""}
          ${styleTags}
          ${includeScripts ? linkTags : ""}
      </head>
      <body>
        <div id="${rootId}">loading..</div>
        ${_bundle_tags_}
        ${_script_elements_}
      </body>
    </html>
  `;
};
