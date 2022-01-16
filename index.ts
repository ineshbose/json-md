import template from 'es6-template-string';
import fs from 'fs';

export const processData = (dir: string, templateFile: string) => {
  const templateText = fs.readFileSync(templateFile, 'utf-8');

  const files = fs.readdirSync(dir);
  files
    .filter((file) => file.endsWith('.json'))
    .forEach((file) => {
      const fileData = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf-8'));
      const finalText = template(templateText, fileData).replace(
        RegExp('newlineChar'.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        '\n'
      );
      const finalFile = file.split('.')[0];
      fs.writeFileSync(`${dir}/${finalFile}.md`, finalText);
    });
};
