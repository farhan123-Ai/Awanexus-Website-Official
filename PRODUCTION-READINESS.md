# Production readiness notes

Before accepting real customer data, address these issues:

1. `src/services/storage.ts` persists business data in browser `localStorage`. Replace this with a shared backend/database.
2. `src/pages/LoginPage.tsx` contains demo admin credentials in front-end code. Client-side credentials can be inspected and are not a security boundary. Add server-side authentication and authorization.
3. Add server-side validation, rate limiting, backups, and appropriate privacy controls for orders, booking, inquiries, and uploaded files.
4. Check all contact details, links, prices, portfolio claims, and sample records before launch.
5. Do not commit `.env` files or secrets. The `.gitignore` excludes common local files; review it before pushing.

This is a static front-end application at present; the PostgreSQL/Supabase schema in the original documentation is a suggested migration outline, not a configured live backend.
