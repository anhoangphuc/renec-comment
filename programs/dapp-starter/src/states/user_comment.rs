use anchor_lang::prelude::*;

#[account]
pub struct UserComment {
    pub comment: String,
}

impl UserComment {
    pub const SEED: &'static [u8] = b"comment";
    pub fn initialize(&mut self, comment: String) -> ProgramResult {
        self.comment = comment;

        Ok(())
    }
}
