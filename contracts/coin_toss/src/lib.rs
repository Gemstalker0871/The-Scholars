#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

#[contract]
pub struct TossContract;

#[contractimpl]
impl TossContract {
    pub fn toss(env: Env) -> Symbol {
        let res: u64 = env.prng().gen_range(1..=100);
        if res % 2 == 0 {
            symbol_short!("Tails")
        } else {
            symbol_short!("Heads")
        }
    }
}
