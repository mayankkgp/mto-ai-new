const fs = require('fs');
const path = require('path');

const dir = './src/components/ui';
if (fs.existsSync(dir)) {
  processDir(dir);
}

function processDir(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directory, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove import type
      content = content.replace(/import type \{[^}]*\} from [^;]+;/g, '');
      content = content.replace(/import type [^ ]+ from [^;]+;/g, '');
      
      // Remove type annotations in function parameters and variables
      content = content.replace(/:\s*[A-Z][\w\.]*(<[^>]+>)?(\[\])?/g, '');
      content = content.replace(/:\s*(string|number|boolean|any|void|unknown|never)/g, '');
      
      // Remove interface and type definitions
      content = content.replace(/interface\s+\w+\s+{[^}]*}/g, '');
      content = content.replace(/type\s+\w+\s+=\s+[^;]+;/g, '');
      
      // Remove generic types from components and hooks
      content = content.replace(/<[A-Z][\w\.]*(<[^>]+>)?(\[\])?>/g, '');
      
      // Remove React.forwardRef types
      content = content.replace(/React\.forwardRef<[^>]+>/g, 'React.forwardRef');
      
      // Remove type assertions (as ...)
      content = content.replace(/\s+as\s+[A-Z][\w\.]*(<[^>]+>)?(\[\])?/g, '');
      
      // Remove generic parameters from function calls
      content = content.replace(/\.forwardRef<[^>]+>/g, '.forwardRef');
      
      // Clean up any double spaces or weird artifacts
      content = content.replace(/\s\s+/g, ' ');
      
      fs.writeFileSync(filePath, content);
    }
  });
}
