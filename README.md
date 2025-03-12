# 🚀 Anchor Bankrun Test Template

A reusable template for setting up Anchor tests with Bankrun. This template provides a quick start for testing Solana programs with pre-configured user accounts, token mints, and token accounts.

## ✨ Features

- Pre-configured test environment with Bankrun
- Three test accounts (owner, user1, user2) with pre-funded SOL
- SPL Token setup with mint and token accounts for all test users
- Clean, reusable structure that works with any Anchor program

## 📋 Prerequisites

Before using this template, you need to set up Bankrun in your Anchor project. Follow the official guide:
[Testing with Jest and Bankrun](https://solana.com/nl/developers/guides/advanced/testing-with-jest-and-bankrun)

## 🏁 Getting Started

1. After setting up Bankrun in your project, copy the template file to your tests directory:

```bash
cp anchor-bankrun-template.ts tests/your-test-name.ts
```

2. Replace placeholders in the template:
   - Replace `YourProgramType` with your program's type
   - Update the import path: `../target/types/your_program_type` to match your program
   - Replace `YourProgram` with your actual program name from the workspace

## 🧩 Template Structure

The template includes:

- Standard imports for Anchor, Bankrun, and SPL Token
- Test suite setup with three pre-configured user accounts
- SPL Token mint creation
- Token account creation for all test users
- Token minting to all accounts
- Basic test structure ready for your implementation

## 💡 Usage Example

```typescript
// Modify the import to point to your program's generated types
import { YourActualProgram } from "../target/types/your_actual_program";

// In the test file
program = anchor.workspace.YourActualProgram as Program<YourActualProgram>;

// Add your test implementation
test('initialize and deposit', async () => {
  // Now you can use the pre-configured accounts and tokens
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), owner.publicKey.toBuffer()],
    program.programId
  );
  
  await program.methods
    .initialize()
    .accounts({
      owner: owner.publicKey,
      vault: vaultPDA,
      tokenMint: tokenMint,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([owner])
    .rpc();
    
  // Rest of your test...
});
```

## ℹ️ Note on Token Support

The current template is set up for fungible tokens. If your use case involves NFTs, you'll need to modify the token setup to change the decimals and mint amounts accordingly.

## 🤝 Contributing

Feel free to submit PRs to improve this template or add additional common testing patterns.

## 📜 License

MIT
