export default store => next => action => {
    const {isGenerated} = action;
    if (!isGenerated) return next(action);
    let id = Date.now();
    next({
        ...action,
        randomId: id
    })
}
