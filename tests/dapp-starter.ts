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
        [Buffer.from("comment"), user.toBuffer()],
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
});

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
