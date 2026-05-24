defmodule Dukkadee.Repo do
  use Ecto.Repo,
    otp_app: :dukkadee,
    adapter: Ecto.Adapters.SQLite3

  use Scrivener, page_size: 12
end
