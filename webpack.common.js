import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import CopyPlugin from "copy-webpack-plugin";

// Obtiene la ruta del archivo actual como un objeto URL
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio del archivo actual
const __dirname = dirname(__filename);

const common = {
  entry: {
    app: './src/scripts/app.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'dist/bundle.js',
  },
  module: { // Añadido para incluir reglas de módulos
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { // Añadido para resolver extensiones de archivos
    extensions: ['.tsx', '.ts', '.js'], // Añadido .ts y .tsx como extensiones
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/datasource/products.json", to: "./dist/products.json" }
      ],
    }),
  ],
};

export default  common;
