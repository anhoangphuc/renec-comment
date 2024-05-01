import * as fs from "fs";
import * as path from "path";
import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export function getDefaultKeypair() {
    const dataPath = path.join(__dirname, "../.wallets/hoangphuc.json");
    const data = fs.readFileSync(dataPath);
    return anchor.web3.Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(data.toString()))
    );
}

export function getTestnetProvider() {
    const keypair = getDefaultKeypair();
    const connection = new anchor.web3.Connection("https://api-testnet.renec.foundation:8899/", "confirmed");
    return new anchor.Provider(connection, new NodeWallet(keypair), {commitment: "confirmed"});
}