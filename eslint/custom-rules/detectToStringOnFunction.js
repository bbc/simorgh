module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow calling toString on functions',
      category: 'Possible Errors',
      recommended: false,
      url: null, // URL to the documentation if available
    },
    fixable: null, // or "code" or "whitespace"
    schema: [], // no options
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.property.name === 'toString' &&
          node.callee.object.type === 'Identifier'
        ) {
          const variable = context
            .getScope()
            .upper?.variables.find(v => v.name === node.callee.object.name);

          if (variable?.defs.length > 0) {
            const [def] = variable.defs;

            if (
              def?.node?.init?.type === 'FunctionExpression' ||
              def?.node?.type === 'ImportDefaultSpecifier'
            ) {
              context.report({
                node,
                message: 'Calling toString on a function is not allowed.',
              });
            }
          }
        }
      },
    };
  },
};
