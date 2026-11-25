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
