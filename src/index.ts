import * as fs from 'fs';
import { parseOptions } from './utils';

const optionInfo = {
    create: {
      default: null,
      type: String
    },
    route: {
        default: null,
        type: String
    }
}

export async function run(argv: string[]) {
    const cliDefaultedOptions = parseOptions(optionInfo, argv);

    if (cliDefaultedOptions.create != null) {
        console.log(`Creating component ${cliDefaultedOptions.create}!`);
        createComponent(cliDefaultedOptions.create);
    } else {
        if (argv.includes('--create')) console.log('Please specify the name for the new component');
    }

    if (cliDefaultedOptions.route != null) {
        console.log(`Creating route ${cliDefaultedOptions.route}!`);
        createRoute(cliDefaultedOptions.route);
    } else {
        if (argv.includes('--route')) console.log('Please specify the name for the new route');
    }
}

function createComponent(componentName: String) {
    let keywords: any = {
        COMPONENT_NAME_DEFAULT: componentName,
        COMPONENT_NAME_CAPPED: componentName.split('-').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(''),
        NODE_MODULES_PATH: '../../../../node_modules'
    };
    
    fs.mkdirSync(`./src/app/components/${componentName}`);

    ['.tsx', '.spec.ts', '.scss'].forEach(extension => {
        let fileData = fs.readFileSync(`./node_modules/stencil-tasks/assets/component/component${extension}.template`, 'UTF-8');

        for (let key of Object.keys(keywords)) {
            fileData = fileData.split(key).join(keywords[key]);
        }

        fs.writeFileSync(`./src/app/components/${componentName}/${componentName}${extension}`, fileData);
    });
}

function createRoute(routeName: String) {
    let keywords: any = {
        COMPONENT_NAME_DEFAULT: routeName,
        COMPONENT_NAME_CAPPED: routeName.split('-').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(''),
        NODE_MODULES_PATH: '../../../../node_modules'
    };
    
    fs.mkdirSync(`./src/app/routes/${routeName}`);

    ['.tsx', '.spec.ts', '.scss'].forEach(extension => {
        let fileData = fs.readFileSync(`./node_modules/stencil-tasks/assets/component/component${extension}.template`, 'UTF-8');

        for (let key of Object.keys(keywords)) {
            fileData = fileData.split(key).join(keywords[key]);
        }

        fs.writeFileSync(`./src/app/routes/${routeName}/${routeName}${extension}`, fileData);
    });
}