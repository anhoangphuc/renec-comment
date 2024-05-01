import * as anchor from "@project-serum/anchor";
import {BN, Program} from "@project-serum/anchor";
import { DappStarter } from "../target/types/dapp_starter";
import * as assert from "assert";
import {PublicKey} from "@solana/web3.js";

describe("dapp-starter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DappStarter as Program<DappStarter>;
  const user1 = anchor.web3.Keypair.generate();
  const user2 = anchor.web3.Keypair.generate();

  before(async () => {
    await provider.connection.requestAirdrop(user1.publicKey, 10000000000);
    await provider.connection.requestAirdrop(user2.publicKey, 10000000000);
    await delay(3000);
  })

  function getUserState(user: PublicKey) {
    const [userState] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), user.toBuffer()],
        program.programId,
    );
    return userState;
  }

  function getUserComment(user: PublicKey, count: number) {
    const [userComment] = PublicKey.findProgramAddressSync(
        [Buffer.from("comment"), user.toBuffer(), Buffer.from([count])],
        program.programId,
    );
    return userComment;
  }

  it("User 1 register success", async () => {
    const userState = getUserState(user1.publicKey);
    try {
      const tx = await program.rpc.userRegister({
        accounts: {
          userState,
          signer: user1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [user1],
      });
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error(error);
      throw error;
    }

    // Get the new counter value
    const userStateAccount = await program.account.userState.fetch(userState);
    assert.equal(userStateAccount.commentCount, 0, "expect counter value to be 0");
  });

  it("User 1 add comment 1", async () => {
    const userState = getUserState(user1.publicKey);
    const userComment1 = getUserComment(user1.publicKey, 0);
    try {
      const tx = await program.rpc.addComment("Comment 1", {
        accounts: {
          userState,
          signer: user1.publicKey,
          userComment: userComment1,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [user1],
      })
    } catch (error) {
      console.error(error);
      throw error;
    }

    const userComment1Account = await program.account.userComment.fetch(userComment1);
    assert.equal(userComment1Account.comment, "Comment 1");
    const userStateAccount = await program.account.userState.fetch(userState);
    assert.equal(userStateAccount.commentCount, 1);
  })

  it("User 1 add comment 2", async () => {
    const userState = getUserState(user1.publicKey);
    const userComment2 = getUserComment(user1.publicKey, 1);
    try {
      const tx = await program.rpc.addComment("Comment 2", {
        accounts: {
          userState,
          signer: user1.publicKey,
          userComment: userComment2,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [user1],
      })
    } catch (error) {
      console.error(error);
      throw error;
    }

    const userComment2Account = await program.account.userComment.fetch(userComment2);
    assert.equal(userComment2Account.comment, "Comment 2");
    const userStateAccount = await program.account.userState.fetch(userState);
    assert.equal(userStateAccount.commentCount, 2);
  })

  it("User 2 register success", async () => {
    const userState = getUserState(user2.publicKey);
    try {
      const tx = await program.rpc.userRegister({
        accounts: {
          userState,
          signer: user2.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [user2],
      });
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error(error);
      throw error;
    }

    // Get the new counter value
    const userStateAccount = await program.account.userState.fetch(userState);
    assert.equal(userStateAccount.commentCount, 0, "expect counter value to be 0");
  });
});

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
