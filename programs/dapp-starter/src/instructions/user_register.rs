use crate::states::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UserRegister<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + UserState::SPACE,
        seeds = [UserState::SEED, signer.key().as_ref()],
        bump,
    )]
    pub user_state: Account<'info, UserState>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handle(ctx: Context<UserRegister>) -> ProgramResult {
    Ok(())
}
