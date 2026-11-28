# Gringotts GRG-R0001 — The Ledger and the Seal

The existing eight-room Gerudo branch is preserved. [Open the laboratory](ledger-and-seal.html). All values and identities are fictional. Gringotts is an optional whitehat open-source reference, not a sovereign authority over Darkweb or any other world. Each world may use independent local rules. Both example clients use the same capability rules.

Backwards: inherited guest contract, Aurics/Crescents, Proton link gallery, calendar and visual vaults; merged conceptually with the 24 November gamebox charter and Hester's 25 November charter.

Forwards: durable transactional journal; cryptographic signatures and real process isolation; separately designed account authentication, selective disclosure, recovery, encrypted vault and reputation. World adapters optional. Preserve public-only portal tags.

Not yet: no real server, persistent accounts, actual signatures, trusted execution, concurrent database transactions, consent UI, payout or redemption, production security or browser playtest. Local caller roles are simulation objects, not authentication. Simulated sequential conflicting spends are not a concurrency proof. No deliberate flaws in the reference desk.

Invariant impact: existing bank and other worlds retained; separate fictional purse yard has no bank access. Prior entire tree preserved at 2bd54b4f93ad09802a37e07c65d266699385468f.

Evidence: 39 deterministic assertions executed on the same model source before commit. Run `node tests/gringotts-r0001.mjs` from repo root. See technical manual and test results.

Charter: https://docs.google.com/document/d/1STJdq0WdTNlmhV2o8vwz92xG2ulCHc38oTydfG7ises/edit

## GRG-R0002 — The closed estate (25 November 2026)

Destructive readback testing of R0001 reproduced a late escrow refund crediting a closed estate. R0002 sends late refunds/releases owed to a closed estate to its succession account instead. Zero-balance estates may close even with outstanding escrow. 44 assertions now pass on the patched source, including both late refund and late release. The toy succession account is not a real inheritance system; beneficiary selection, estate authorization and appeal remain open. R0001 preserved at 00cb48fe4c1faa7866e722f7e4b16701b53f87ac. No deliberate weakness in the whitehat model. The independent toy yard remains a local fictional crime mechanic.

## GRG-R0003 — The Anatomy of a Secret (28 November 2026; draft)

Backwards: preserves eight rooms, GRG-R0002 ledger and separate R0037 checkpoint. Forwards: [security contract](ANATOMY_CONTRACT.md) and [eight-room offline laboratory](anatomy-of-a-secret.html), followed by durable ledger, real signatures, account auth, vault encryption, Vitra gateway, adapters and spatial integration. Not yet: no backend, real crypto, browser test, published release or cross-world integration. Invariant impact: no cookies, no real secrets, no private portal data, no changes outside Gringotts. Evidence: 32 model checks executed, [tests](anatomy-tests.mjs) and [results](evidence/anatomy-tests.json). Predecessor entire tree in Git at 744fde1e1a5408ff0d86400de3b410757d9db2f7. Draft branch; not a new global revision.

## GRG-R0004 — The Honest Word (draft)

Backwards: preserves R0003 instruments and paused R0037. Forwards: [scripted trust experience](honest-word.html), [language contract](HONEST_WORD.md), 16 encounters / 48 choices. Not yet: spatial character integration, actual accounts, production language generation or live settlement. Invariant impact: only Gringotts files; no real data or cross-world authority. Evidence: 196 deterministic assertions [source](honest-word-tests.mjs), [results](evidence/honest-word-tests.json). Full predecessor: 0a5602bbd1bad4fa7a679f0fb53899ed7c190dac. Not a global release.
