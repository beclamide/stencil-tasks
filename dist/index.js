"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils");
const optionInfo = {
    create: {
        default: null,
        type: String
    },
    read: {
        default: null,
        type: String
    }
};
function run(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const cliDefaultedOptions = utils_1.parseOptions(optionInfo, argv);
        if (cliDefaultedOptions.create != null) {
            console.log(`Creating ${cliDefaultedOptions.create}!`);
            createComponent(cliDefaultedOptions.create);
        }
        else {
            if (argv.includes('--create'))
                console.log('Please specify the name for the new component');
        }
    });
}
exports.run = run;
function createComponent(componentName) {
    let keywords = {
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
