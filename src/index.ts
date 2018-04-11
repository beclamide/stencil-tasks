import * as fs from 'fs';
import { parseOptions } from './utils';

const optionInfo = {
    create: {
      default: null,
      type: String
    },
    read: {
        default: null,
        type: String
    }
}

export async function run(argv: string[]) {
    const cliDefaultedOptions = parseOptions(optionInfo, argv);

    if (cliDefaultedOptions.create != null) {
        console.log(`Creating ${cliDefaultedOptions.create}!`);
        createComponent(cliDefaultedOptions.create);
    } else {
        if (argv.includes('--create')) console.log('Please specify the name for the new component');
    }
}

function createComponent(componentName: String) {
    let keywords: any = {
        COMPONENT_NAME_DEFAULT: componentName,
        COMPONENT_NAME_CAPPED: componentName.split('-').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join('')
    };
    
    fs.mkdirSync(`./src/components/${componentName}`);

    ['.tsx', '.spec.ts', '.scss'].forEach(extension => {
        let fileData = fs.readFileSync(`./node_modules/stencil-tasks/assets/component/component${extension}.template`, 'UTF-8');

        for (let key of Object.keys(keywords)) {
            fileData = fileData.split(key).join(keywords[key]);
        }

        fs.writeFileSync(`./src/components/${componentName}/${componentName}${extension}`, fileData);
    });
}