import { accordionForCategory, assembleContent, frontmatter, markdown, writeToFile } from '../../text-generation.js';

const cwd = 'v5/retheme';

async function generate() {
  const data = (await import(`../../../versions/v5/index.js`)).default.nextjs;

  const defaultsChangeItem = {
    title: 'Changes to default variables',
    content: `\nThe default values of some [appearance variables](/docs/components/customization/variables) have changed which may impact your UI (if you are not already overriding them).

    - The default \`colorPrimary\` value changed from \`#103FEF\` to \`#2F3037\`. As the new color is a dark grey, the \`colorPrimary\` of the dark theme was changed to \`#FFFFFF\`.
    - The default \`fontSize\` value changed from \`1rem\` to \`0.8125rem\`
    - The default \`fontWeight\` values changed from \`{ normal: 400, medium: 500, bold: 600 }\` to \`{ normal: 400, medium: 500, bold: 700 }\`
    - Previously, the default value for \`fontSmoothing\` was \`auto\`. This value is now unset. If you want to pass a custom value to it, you can still do so.\n`,
  };

  return assembleContent({ data: data, cwd }, [
    frontmatter({
      title: 'Redesigned Components in v5',
      description: 'Learn how to handle changes as a result of redesigned components in Clerk version 5',
    }),
    '# Redesigned Components in v5',
    markdown('intro'),
    '## Appearance Changes',
    accordionForCategory('appearance', { additionalItems: defaultsChangeItem }),
    '## Localization Changes',
    accordionForCategory('localization', {}),
  ]);
}

generate().then(writeToFile(cwd));
