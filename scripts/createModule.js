import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("🚀 Creating new module...");

// Setup current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read command line arguments (after "--")
const args = process.argv.slice(2);

// Module name and paths
const moduleName = args[0].replace("--", "").toLowerCase();
const ModuleName = capitalize(moduleName);
const modulePath = path.join(__dirname, "../src/modules", moduleName);

// Check if module already exists
if (fs.existsSync(modulePath)) {
  console.error(`❌ Module "${moduleName}" already exists at src/modules/${moduleName}`);
  process.exit(1);
}

// Create module folder
fs.mkdirSync(modulePath, { recursive: true });

// Prepare default files
const files = {
  [`${moduleName}.controller.js`]: `import ${ModuleName}Service from "./${moduleName}.service.js";
 import { statusCode } from '../../utils/constants/statusCode.js';
import './${moduleName}.event.js'


export default class ${ModuleName}Controller {
  constructor() {
    this.${moduleName}Service =  ${ModuleName}Service;
  }

  getAll = async (req, res, next) => {
    try {
            // res.fail('Todos not found');
       res.success("Get All Todos",{ from: "${moduleName} Module" }, statusCode.OK);
      
    } catch (err) {
      next(err);
    }
  };

   create = async (req, res, next) => {
    try {
      const ${moduleName} = await this.${moduleName}Service.create(req.body); 
      res.success("${moduleName} Created", ${moduleName}, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };


}
`,
  [`${moduleName}.service.js`]: `
    import eventBus from "../../utils/eventBus.js";

    class ${ModuleName}Service {
   



  constructor() {
    // this.TODO = todoModel;
    this.eventBus = eventBus;
  }


  async getAll() {
    return [];
  }

  async create(data) {
    const new${moduleName} = { id: Date.now(), ...data };
 
    // Emit event
    eventBus.emit("${moduleName}.created", new${moduleName});

    return new${moduleName};
  }

}

export default new ${ModuleName}Service();
`,

  [`${moduleName}.model.js`]: `// Define your ${moduleName} models here
`,

  [`${moduleName}.routes.js`]: `import { Router } from 'express';
import ${ModuleName}Controller from './${moduleName}.controller.js';
import validate from '../../middlewares/default/validate.js';
import rateLimiter from '../../middlewares/default/rateLimiter.js';

const router = Router();
const ${moduleName}Controller = new ${ModuleName}Controller();

router.get('/', ${moduleName}Controller.getAll);
router.post("/", ${moduleName}Controller.create); // <-- new

export default router;
`,

  [`${moduleName}.validator.js`]: `
import { z } from 'zod';
/*
export const create${ModuleName}Schema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});
*/
`,
  [`${moduleName}.event.js`]: `import eventBus from "../../utils/eventBus.js";

/**
 * Listen for ${moduleName} events
 */
eventBus.on("${moduleName}.created", (data) => {
  console.log("📢  ${moduleName}.created event is Called !");
});

`,
};

// Write files inside new module
for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(modulePath, fileName), content);
}

console.log(`✅ Module "${moduleName}" created successfully inside "src/modules/${moduleName}"!`);

// Helper function to capitalize
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
