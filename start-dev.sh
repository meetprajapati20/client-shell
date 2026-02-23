#!/bin/bash
# client-shell/start-dev.sh

read -p "Which module are you authorized for? (e.g., module1, module2): " MODULE_NAME

# Make sure the modules directory exists
mkdir -p src/modules

echo "🔄 Initializing shared utilities..."
git submodule update --init src/modules/shared

echo "🔄 Initializing your module: $MODULE_NAME..."
git submodule update --init "src/modules/client-$MODULE_NAME"

echo "🛠️ Ensuring Webpack doesn't crash from missing modules..."
ALL_MODULES=("module1" "module2" "module3")

for MOD in "${ALL_MODULES[@]}"; do
  # ✅ Updated path to check inside src/modules/
  FOLDER_PATH="src/modules/client-$MOD"
  
  if [ ! -d "$FOLDER_PATH" ]; then
    echo "   -> Creating dummy fallback for $MOD..."
    
    # Create the fake src folder inside the missing module
    mkdir -p "$FOLDER_PATH/src"
    
    # Create the dummy index.js file
    cat <<EOF > "$FOLDER_PATH/src/index.js"
export default function Dummy() { 
  throw new Error("Module not available locally"); 
}
EOF
  fi
done

echo "📦 Installing dependencies and starting server..."
npm install
UV_USE_IO_URING=0 PORT=9872 npm start