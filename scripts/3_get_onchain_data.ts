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

    const [userComment] = PublicKey.findProgramAddressSync(
        [Buffer.from("comment"), provider.wallet.publicKey.toBuffer(), Buffer.from([0])],
        program.programId,
    );
    try {
        const userCommentAccount = await program.account.userComment.fetch(userComment);
        console.log("My comment is ", userCommentAccount.comment);
    } catch (error) {
        console.error(error);
        throw error;
    }
})()
