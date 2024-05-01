export type DappStarter = {
  "version": "0.1.0",
  "name": "dapp_starter",
  "instructions": [
    {
      "name": "userRegister",
      "accounts": [
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addComment",
      "accounts": [
        {
          "name": "userComment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userComment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "comment",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commentCount",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: DappStarter = {
  "version": "0.1.0",
  "name": "dapp_starter",
  "instructions": [
    {
      "name": "userRegister",
      "accounts": [
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addComment",
      "accounts": [
        {
          "name": "userComment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userComment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "comment",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commentCount",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
