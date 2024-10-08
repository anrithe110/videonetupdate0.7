import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'ge'],
  defaultLocale: 'ge'
});
 
export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)','/(ge|en)/:path*']
};
