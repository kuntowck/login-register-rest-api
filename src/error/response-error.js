class ResponseError extends Error {
  constructor(status, message) {
    super(message); //mengirim pesan error
    this.status = status;
  }
}

export { ResponseError };
