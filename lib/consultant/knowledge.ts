import fs from "fs";
import path from "path";

const dataRoot = path.join(process.cwd(), "data");

export async function loadCompanyKnowledge(files: string[]) {
  const contents: string[] = [];
  for (const filename of files) {
    const filePath = path.join(dataRoot, `${filename}.md`);
    if (fs.existsSync(filePath)) {
      contents.push(await fs.promises.readFile(filePath, "utf-8"));
    }
  }
  return contents.join("\n\n");
}
