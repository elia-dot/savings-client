import { login, signup, forgotPassword } from '../languages/auth';
import { addChild, menu, childrenDetails } from '../languages/parent';
import { goals, history, tasks } from '../languages/tabs';
import { misc } from '../languages/misc';
export const en = {
  loginScreen: {
    title: login.title.en,
    nameLabel: login.nameLabel.en,
    namePlaceholder: login.namePlaceholder.en,
    passwordLabel: login.passwordLabel.en,
    passwordPlaceholder: login.passwordPlaceholder.en,
    showPassword: login.showPassword.en,
    forgotPassword: login.forgotPassword.en,
    loginBtn: login.loginBtn.en,
    loadingLoginBtn: login.loadingLoginBtn.en,
    loginTextLink: login.loginTextLink.en,
    loginLink: login.loginLink.en,
    loginError: login.loginError.en,
    missingFields: login.missingFields.en,
  },
  signupScreen: {
    title: signup.title.en,
    emailLabel: signup.emailLabel.en,
    emailPlaceholder: signup.emailPlaceholder.en,
    passwordLabel: signup.passwordLabel.en,
    passwordPlaceholder: signup.passwordPlaceholder.en,
    confirmPasswordLabel: signup.confirmPasswordLabel.en,
    confirmPasswordPlaceholder: signup.confirmPasswordPlaceholder.en,
    showPassword: signup.showPassword.en,
    signupBtn: signup.signupBtn.en,
    loadingSignupBtn: signup.loadingSignupBtn.en,
    signupTextLink: signup.signupTextLink.en,
    signupLink: signup.signupLink.en,
    wrongPasswords: signup.wrongPasswords.en,
    shortPassword: signup.shortPassword.en,
    userExists: signup.userExists.en,
  },
  forgotPasswordScreen: {
    title: forgotPassword.title.en,
    emailTitle: forgotPassword.emailTitle.en,
    textBtn: forgotPassword.textBtn.en,
    loadingTextBtn: forgotPassword.loadingTextBtn.en,
    tokenTitle: forgotPassword.tokenTitle.en,
    passwordTitle: forgotPassword.passwordTitle.en,
    noEmailError: forgotPassword.noEmailError.en,
    emailSent: forgotPassword.emailSent.en,
    emailError: forgotPassword.emailError.en,
    noTokenError: forgotPassword.noTokenError.en,
    tokenError: forgotPassword.tokenError.en,
  },
  addChildScreen: {
    title: addChild.title.en,
    nameLabel: addChild.nameLabel.en,
    usernameLabel: addChild.usernameLabel.en,
    passwordLabel: addChild.passwordLabel.en,
    profitLabel: addChild.profitLabel.en,
    addBtn: addChild.addBtn.en,
    loadingAddBtn: addChild.loadingAddBtn.en,
    missingFields: addChild.missingFields.en,
    cancelBtn: addChild.cancelBtn.en,
    usernameError: addChild.usernameError.en,
    passwordError: addChild.passwordError.en,
  },
  menu: {
    logout: menu.logout.en,
    details: menu.details.en,
    noChildren: menu.noChildren.en,
  },
  childrenDetails: {
    title: childrenDetails.title.en,
    name: childrenDetails.name.en,
    username: childrenDetails.username.en,
    updatePassword: childrenDetails.updatePassword.en,
    newPasswordLabel: childrenDetails.newPasswordLabel.en,
    updateBtn: childrenDetails.updateBtn.en,
    loadingUpdateBtn: childrenDetails.loadingUpdateBtn.en,
    cancelBtn: childrenDetails.cancelBtn.en,
    missingFields: childrenDetails.missingFields.en,
    updateError: childrenDetails.updateError.en,
  },
  goals: {
    title: goals.title.en,
    noGoalsParent: goals.noGoalsParent.en,
    noGoalsBtnParent: goals.noGoalsBtnParent.en,
    noGoalsChild: goals.noGoalsChild.en,
    noGoalsBtnChild: goals.noGoalsBtnChild.en,
    amountLeft: goals.amountLeft.en,
    completed: goals.completed.en,
    deleteTitle: goals.deleteTitle.en,
    deleteText: goals.deleteText.en,
    deleteBtn: goals.deleteBtn.en,
    cancelBtn: goals.cancelBtn.en,
    createGoalTitle: goals.createGoalTitle.en,
    updateGoalTitle: goals.updateGoalTitle.en,
    nameLabel: goals.nameLabel.en,
    priceLabel: goals.priceLabel.en,
    categoryLabel: goals.categoryLabel.en,
    categoryPlaceholder: goals.categoryPlaceholder.en,
    createBtn: goals.createBtn.en,
    loadingCreateBtn: goals.loadingCreateBtn.en,
    updateBtn: goals.updateBtn.en,
    loadingUpdateBtn: goals.loadingUpdateBtn.en,
    missingFields: goals.missingFields.en,
    deletingGoal: goals.deletingGoal.en,
    noGoalsPushTitle: goals.noGoalsPushTitle.en,
    noGoalsPushBody: goals.noGoalsPushBody.en,
    sending: goals.sending.en,
  },
  history: {
    title: history.title.en,
    topTextParent: history.topTextParent.en,
    allBtn: history.allBtn.en,
    depositBtn: history.depositBtn.en,
    withdrawBtn: history.withdrawBtn.en,
    withdraw: history.withdraw.en,
    deposit: history.deposit.en,
    savingTitle: history.savingTitle.en,
    amountLabel: history.amountLabel.en,
    descriptionLabel: history.descriptionLabel.en,
    cancelBtn: history.cancelBtn.en,
    createBtn: history.createBtn.en,
    loadingCreateBtn: history.loadingCreateBtn.en,
  },
  tasks: {
    title: tasks.title.en,
    allBtn: tasks.allBtn.en,
    completedBtn: tasks.completedBtn.en,
    unCompletedBtn: tasks.unCompletedBtn.en,
    createTaskTitle: tasks.createTaskTitle.en,
    descriptionLabel: tasks.descriptionLabel.en,
    priceLabel: tasks.priceLabel.en,
    cancelBtn: tasks.cancelBtn.en,
    createBtn: tasks.createBtn.en,
    loadingCreateBtn: tasks.loadingCreateBtn.en,
    confirmCompleteTask: tasks.confirmCompleteTask.en,
    cancelCompleteTask: tasks.cancelCompleteTask.en,
    sendReminder: tasks.sendReminder.en,
    completeTaskTitle: tasks.completeTaskTitle.en,
    uncompleteTaskTitle: tasks.uncompleteTaskTitle.en,
    pushTitle: tasks.pushTitle.en,
    pushBody: tasks.pushBody.en,
    loaderTitle: tasks.loaderTitle.en,
    completedPushTitle: tasks.completedPushTitle.en,
    completedPushBody: tasks.completedPushBody.en,
  },
  misc: {
    childGreetings: misc.childGreetings.en,
    balance: misc.balance.en,
    loading: misc.loading.en,
    currency: misc.currency.en,
  },
};

export const he = {
  loginScreen: {
    title: login.title.he,
    nameLabel: login.nameLabel.he,
    namePlaceholder: login.namePlaceholder.he,
    passwordLabel: login.passwordLabel.he,
    passwordPlaceholder: login.passwordPlaceholder.he,
    showPassword: login.showPassword.he,
    forgotPassword: login.forgotPassword.he,
    loginBtn: login.loginBtn.he,
    loadingLoginBtn: login.loadingLoginBtn.he,
    loginTextLink: login.loginTextLink.he,
    loginLink: login.loginLink.he,
    loginError: login.loginError.he,
    missingFields: login.missingFields.he,
  },
  signupScreen: {
    title: signup.title.he,
    emailLabel: signup.emailLabel.he,
    emailPlaceholder: signup.emailPlaceholder.he,
    passwordLabel: signup.passwordLabel.he,
    passwordPlaceholder: signup.passwordPlaceholder.he,
    confirmPasswordLabel: signup.confirmPasswordLabel.he,
    confirmPasswordPlaceholder: signup.confirmPasswordPlaceholder.he,
    showPassword: signup.showPassword.he,
    signupBtn: signup.signupBtn.he,
    loadingSignupBtn: signup.loadingSignupBtn.he,
    signupTextLink: signup.signupTextLink.he,
    signupLink: signup.signupLink.he,
    missingFields: signup.missingFields.he,
    wrongPasswords: signup.wrongPasswords.he,
    shortPassword: signup.shortPassword.he,
    userExists: signup.userExists.he,
  },
  forgotPasswordScreen: {
    title: forgotPassword.title.he,
    emailTitle: forgotPassword.emailTitle.he,
    textBtn: forgotPassword.textBtn.he,
    loadingTextBtn: forgotPassword.loadingTextBtn.he,
    tokenTitle: forgotPassword.tokenTitle.he,
    passwordTitle: forgotPassword.passwordTitle.he,
    noEmailError: forgotPassword.noEmailError.he,
    emailSent: forgotPassword.emailSent.he,
    emailError: forgotPassword.emailError.he,
    noTokenError: forgotPassword.noTokenError.he,
    tokenError: forgotPassword.tokenError.he,
  },
  addChildScreen: {
    title: addChild.title.he,
    nameLabel: addChild.nameLabel.he,
    usernameLabel: addChild.usernameLabel.he,
    passwordLabel: addChild.passwordLabel.he,
    profitLabel: addChild.profitLabel.he,
    addBtn: addChild.addBtn.he,
    loadingAddBtn: addChild.loadingAddBtn.he,
    cancelBtn: addChild.cancelBtn.he,
    missingFields: addChild.missingFields.he,
    usernameError: addChild.usernameError.he,
    passwordError: addChild.passwordError.he,
  },
  menu: {
    logout: menu.logout.he,
    details: menu.details.he,
    noChildren: menu.noChildren.he,
  },
  childrenDetails: {
    title: childrenDetails.title.he,
    name: childrenDetails.name.he,
    username: childrenDetails.username.he,
    updatePassword: childrenDetails.updatePassword.he,
    newPasswordLabel: childrenDetails.newPasswordLabel.he,
    updateBtn: childrenDetails.updateBtn.he,
    loadingUpdateBtn: childrenDetails.loadingUpdateBtn.he,
    cancelBtn: childrenDetails.cancelBtn.he,
    missingFields: childrenDetails.missingFields.he,
    updateError: childrenDetails.updateError.he,
  },
  goals: {
    title: goals.title.he,
    noGoalsParent: goals.noGoalsParent.he,
    noGoalsBtnParent: goals.noGoalsBtnParent.he,
    noGoalsChild: goals.noGoalsChild.he,
    noGoalsBtnChild: goals.noGoalsBtnChild.he,
    amountLeft: goals.amountLeft.he,
    completed: goals.completed.he,
    deleteTitle: goals.deleteTitle.he,
    deleteText: goals.deleteText.he,
    deleteBtn: goals.deleteBtn.he,
    cancelBtn: goals.cancelBtn.he,
    createGoalTitle: goals.createGoalTitle.he,
    updateGoalTitle: goals.updateGoalTitle.he,
    nameLabel: goals.nameLabel.he,
    priceLabel: goals.priceLabel.he,
    categoryLabel: goals.categoryLabel.he,
    categoryPlaceholder: goals.categoryPlaceholder.he,
    createBtn: goals.createBtn.he,
    loadingCreateBtn: goals.loadingCreateBtn.he,
    updateBtn: goals.updateBtn.he,
    loadingUpdateBtn: goals.loadingUpdateBtn.he,
    missingFields: goals.missingFields.he,
    deletingGoal: goals.deletingGoal.he,
    noGoalsPushTitle: goals.noGoalsPushTitle.he,
    noGoalsPushBody: goals.noGoalsPushBody.he,
    sending: goals.sending.he,
  },
  history: {
    title: history.title.he,
    topTextParent: history.topTextParent.he,
    allBtn: history.allBtn.he,
    depositBtn: history.depositBtn.he,
    withdrawBtn: history.withdrawBtn.he,
    deposit: history.deposit.he,
    withdraw: history.withdraw.he,
    savingTitle: history.savingTitle.he,
    amountLabel: history.amountLabel.he,
    descriptionLabel: history.descriptionLabel.he,
    cancelBtn: history.cancelBtn.he,
    createBtn: history.createBtn.he,
    loadingCreateBtn: history.loadingCreateBtn.he,
  },
  tasks: {
    title: tasks.title.he,
    allBtn: tasks.allBtn.he,
    completedBtn: tasks.completedBtn.he,
    unCompletedBtn: tasks.unCompletedBtn.he,
    createTaskTitle: tasks.createTaskTitle.he,
    descriptionLabel: tasks.descriptionLabel.he,
    priceLabel: tasks.priceLabel.he,
    cancelBtn: tasks.cancelBtn.he,
    createBtn: tasks.createBtn.he,
    loadingCreateBtn: tasks.loadingCreateBtn.he,
    confirmCompleteTask: tasks.confirmCompleteTask.he,
    cancelCompleteTask: tasks.cancelCompleteTask.he,
    sendReminder: tasks.sendReminder.he,
    completeTaskTitle: tasks.completeTaskTitle.he,
    uncompleteTaskTitle: tasks.uncompleteTaskTitle.he,
    pushTitle: tasks.pushTitle.he,
    pushBody: tasks.pushBody.he,
    loaderTitle: tasks.loaderTitle.he,
    completedPushTitle: tasks.completedPushTitle.he,
    completedPushBody: tasks.completedPushBody.he,
  },
  misc: {
    childGreetings: misc.childGreetings.he,
    balance: misc.balance.he,
    loading: misc.loading.he,
    currency: misc.currency.he,
  },
};
