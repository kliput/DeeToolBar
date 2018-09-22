const {
    spawn
} = require('child_process');
const {
    removeSync,
    emptyDirSync,
    copySync,
    readdirSync,
} = require('fs-extra');
const path = require('path');
const FileHound = require('filehound');
const { promisify } = require('util');
const zipdir = require('zip-dir');

const projectName = 'DeeToolBar';
const projectDir = 'DeeToolBar';
const deliveryDir = path.join(projectDir, 'Delivery');
const sources = ['Background', 'Content', 'content_scripts', 'Popup', 'manifest.json'];

function compileTypeScript() {
    return new Promise((resolve) => {
        const tsc = spawn('./node_modules/typescript/bin/tsc', ['-p', projectDir]);

        tsc.stdout.on('data', (data) => {
            console.log(data);
        });
    
        tsc.stderr.on('data', (data) => {
            console.error(data);
        });
    
        tsc.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
    
}

async function main() {
    emptyDirSync(deliveryDir);
    sources.map(spath => copySync(path.join(projectDir, spath), path.join(deliveryDir, spath)));
    const tsFiles = await FileHound.create()
        .paths(deliveryDir)
        .ext('ts')
        .find();
    tsFiles.forEach(tsPath => removeSync(tsPath));
    await compileTypeScript();
    const deliveryFiles = readdirSync(deliveryDir);
    await promisify(zipdir)(deliveryDir, { saveTo: path.join(deliveryDir, `${projectName}.xpi`) });
}

main();
