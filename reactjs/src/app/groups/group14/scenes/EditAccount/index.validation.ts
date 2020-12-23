import { L } from 'shared/lib/abpUtility';

const rules = {
  accountName: [
    {
      required: false,
      message: L('ThisFieldIsRequired'),
    },
  ],
  currentPassword: [
    {
      required: true,
      message: L('ThisFieldIsRequired'),
    },
  ],
  newPassword: [
  ],
  email: [
    {
      type: 'email',
      message: L('EmailNotValid')
    },
    {
      required: true,
      message: L('ThisFieldIsRequired')
    }
  ],
  personId: [
  ],
};

export default rules;
