import { sha256 } from "js-sha256";

export default function Hashing() {
    const hash = sha256.create();
    hash.update("Message to hash");
    console.log(hash.hex());
    return (
        <div>
            <span>Hashing : {hash.hex()}</span>
        </div>
    )
}
