use anchor_lang::prelude::*;

#[account]
pub struct UserState {
    pub comment_count: u8, // 1 byte
}

impl UserState {
    pub const SPACE: usize = 8;
    pub const SEED: &'static [u8] = b"user";

    pub fn increment_count(&mut self) -> ProgramResult {
        self.comment_count += 1;
        Ok(())
    }
}
