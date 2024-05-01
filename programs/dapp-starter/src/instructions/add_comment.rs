use crate::states::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(comment: String)]
pub struct AddComment<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 4 + comment.len(),
        seeds = [UserComment::SEED, signer.key().as_ref(), &user_state.comment_count.to_le_bytes()],
        bump,
    )]
    pub user_comment: Account<'info, UserComment>,
    #[account(
        mut,
        seeds = [UserState::SEED, signer.key().as_ref()],
        bump,
    )]
    pub user_state: Account<'info, UserState>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handle(ctx: Context<AddComment>, comment: String) -> ProgramResult {
    let user_comment = &mut ctx.accounts.user_comment;
    let user_state = &mut ctx.accounts.user_state;
    user_comment.initialize(comment)?;
    user_state.increment_count()?;

    Ok(())
}
