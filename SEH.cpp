_set_se_translator([](unsigned int u, struct _EXCEPTION_POINTERS *) {
  struct seh_exception : std::exception {
          std::string msg;
          seh_exception() noexcept = default;
          seh_exception(const seh_exception &) noexcept = default;
          seh_exception(seh_exception &&) noexcept = default;
          ~seh_exception() noexcept = default;
          seh_exception(unsigned int u) noexcept { msg = "SEH:" + std::to_string(u); }
          [[nodiscard]] char const *what() const { return msg.c_str(); }
  };
  throw seh_exception(u);
});
