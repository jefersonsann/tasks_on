window.dialog = (data) => {
  const modal = document.querySelector(`[data-dialog="${data}"]`);
  const open = modal.getAttribute("open");
  if (open !== null) {
    return modal.close();
  }
  modal.show();
};
