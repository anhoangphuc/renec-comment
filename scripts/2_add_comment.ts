import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import { DappStarter } from "../target/types/dapp_starter";
import {PublicKey} from "@solana/web3.js";
import {getTestnetProvider} from "./utils";

(async () => {
    console.log("Start running");
    const provider = getTestnetProvider();
    anchor.setProvider(provider);
    console.log("Get provider success", provider.wallet.publicKey.toString());

    const program = anchor.workspace.DappStarter as Program<DappStarter>;

    const [userState] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
        program.programId,
    );

    const [userComment] = PublicKey.findProgramAddressSync(
        [Buffer.from("comment"), provider.wallet.publicKey.toBuffer(), Buffer.from([0])],
        program.programId,
    );
    try {
        const tx = await program.rpc.addComment("This is my first comment", {
            accounts: {
                userState,
                userComment,
                signer: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
        });
        console.log("Your transaction signature", tx);
    } catch (error) {
        console.error(error);
        throw error;
    }
})()
