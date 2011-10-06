AC_PREREQ(2.63)
dnl be carefull, the version needs to be in sync with your gnome shell version
AC_INIT([status-menu-additions], [3.0], [https://github.com/banrahan/status-menu-additions/issues])

AC_CONFIG_MACRO_DIR([m4])
AC_CONFIG_AUX_DIR([config])

AM_INIT_AUTOMAKE([1.10 dist-bzip2 no-dist-gzip foreign tar-ustar])

GETTEXT_PACKAGE=status-menu-additions
AC_SUBST(GETTEXT_PACKAGE)
AC_DEFINE_UNQUOTED(GETTEXT_PACKAGE, "$GETTEXT_PACKAGE",
                   [The prefix for our gettext translation domains.])
IT_PROG_INTLTOOL(0.26)

PKG_PROG_PKG_CONFIG([0.22])

GLIB_GSETTINGS

dnl Please keep this sorted alphabetically
AC_CONFIG_FILES([
  Makefile
  po/Makefile.in
  src/Makefile
])
AC_OUTPUT
