# Zaify's Restaurant — Preview Run Doc

Stack: React 19 + Vite 8. No environment variables or `.env` files are needed.

## Reproduce artifacts (fresh checkout)

1. Install dependencies with npm (lockfile: `package-lock.json`):
   ```
   npm install --no-audit --no-fund
   ```
2. Nothing else to copy — the project has no env files, generated assets, or build artifacts needed for dev mode.

## Run the dev server

- Default port: **5173** (Vite default). If taken, Vite auto-selects the next free port — read the actual URL from the log.
- Start detached (PowerShell; stdout and stderr must go to different files):
  ```powershell
  powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
  ```
  Note: this call can hang the invoking shell until timeout even though the server starts fine. Verify success via the log file and `netstat -ano | grep 5173` rather than the exit.
- Confirm it survived: `powershell -NoProfile -Command "Get-Process -Id <pid>"`
- Confirm it answers: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/` → expect `200`
- Register preview with the URL and the printed pid.
- Production build check (optional): `npm run build`
