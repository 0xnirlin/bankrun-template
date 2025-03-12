import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { YourProgramType } from "../target/types/your_program_type";
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import { describe, test, beforeEach } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  createMint,
  createAccount,
  createAssociatedTokenAccount,
  mintTo,
  getAccount,
  getMint,
} from "spl-token-bankrun";
import { Clock } from "solana-bankrun";

describe('Test Suite', () => {
  let provider: BankrunProvider;
  let program: Program<YourProgramType>;
  let owner: anchor.web3.Keypair;
  let user1: anchor.web3.Keypair;
  let user2: anchor.web3.Keypair;
  let context: any;
  let tokenMint: PublicKey;
  let ownerTokenAccount: PublicKey;
  let user1TokenAccount: PublicKey;
  let user2TokenAccount: PublicKey;
  
  beforeEach(async () => {
    owner = new anchor.web3.Keypair();
    user1 = new anchor.web3.Keypair();
    user2 = new anchor.web3.Keypair();
    
    context = await startAnchor(".", [], [
      {
        address: owner.publicKey,
        info: {
          lamports: 259200000_000_000,
          executable: false,
          owner: anchor.web3.SystemProgram.programId,
          data: Buffer.alloc(0),
        },
      },
      {
        address: user1.publicKey,
        info: {
          lamports: 10000000000,
          executable: false,
          owner: anchor.web3.SystemProgram.programId,
          data: Buffer.alloc(0),
        },
      },
      {
        address: user2.publicKey,
        info: {
          lamports: 10000000000,
          executable: false,
          owner: anchor.web3.SystemProgram.programId,
          data: Buffer.alloc(0),
        },
      },
    ]);
    
    provider = new BankrunProvider(context);
    anchor.setProvider(provider);
    program = anchor.workspace.YourProgram as Program<YourProgramType>;

    tokenMint = await createMint(
      context.banksClient,
      owner,
      owner.publicKey,
      owner.publicKey,
      6,
    )

    ownerTokenAccount = await createAccount(
      context.banksClient,
      owner,
      tokenMint,
      owner.publicKey,
    )
    
    user1TokenAccount = await createAccount(
      context.banksClient,
      owner,
      tokenMint,
      user1.publicKey,
    )
    
    user2TokenAccount = await createAccount(
      context.banksClient,
      owner,
      tokenMint,
      user2.publicKey,
    )

    await mintTo(
      context.banksClient,
      owner,
      tokenMint,
      ownerTokenAccount,
      owner.publicKey,
      100000_000_000,
    )

    await mintTo(
      context.banksClient,
      owner,
      tokenMint,
      user1TokenAccount,
      owner.publicKey,
      100000_000_000,
    )

    await mintTo( 
      context.banksClient,
      owner,
      tokenMint,
      user2TokenAccount,
      owner.publicKey,
      100000_000_000,
    )

    // Get account info if needed
    let ownerAccountInfo = await getAccount(
      context.banksClient,
      ownerTokenAccount,
    )
    
    let user1AccountInfo = await getAccount(
      context.banksClient,
      user1TokenAccount,
    )
    
    let user2AccountInfo = await getAccount(
      context.banksClient,
      user2TokenAccount,
    )
  });

  test('Your test', async () => {
    // Test implementation here
  });
});