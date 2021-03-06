const { dialog } = require('electron').remote;

/**
 * Fires Electron dialog box to alert users that the name is already taken
 */

const uniqueNameAlert = () => {
  const options = {
    buttons: ['Okay'],
    message: 'Component names must be unique',
  };
  const response = dialog.showMessageBox(options);
  if (response === 0) {
    return;
  }
};

export default uniqueNameAlert;
