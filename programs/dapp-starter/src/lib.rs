mod instructions;
mod states;

use crate::instructions::*;
use crate::states::*;
use anchor_lang::prelude::*;

declare_id!("6fv1QAQC5t5DtCpqNf78sf2EW5XGj2YHPqpkwdxP7tiU");

#[program]
pub mod dapp_starter {
    use super::*;

    pub fn user_register(ctx: Context<UserRegister>) -> ProgramResult {
        user_register::handle(ctx)
    }

    pub fn add_comment(ctx: Context<AddComment>, comment: String) -> ProgramResult {
        add_comment::handle(ctx, comment)
    }
}
