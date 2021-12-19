import { API, FileInfo, JSXIdentifier } from 'jscodeshift';
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // find Button JSX elements
  root
    .findJSXElements('Button')
    // find `kind` prop
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'kind',
      },
    })
    // change `kind` to `variant`
    .forEach((jsxAttribute) => {
      const identifier = jsxAttribute.node.name as JSXIdentifier;
      identifier.name = 'variant';
    });
  return root.toSource();
}
