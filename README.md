## status-menu-additions

Alternative to the alternative-status-menu@gnome-shell-extensions.gnome.org. That version wipes out the status menu, this one just adds a few items to it.  This was shamelessly copied from http://blog.fpmurphy.com/2011/05/more-gnome-shell-customization.html, with one addition.  There is a check for whether or not this is the suspend is the last item in the list, if it is not a separator will be inserted.  This is so that it plays a bit nicer with other extensions.

---

### Installation

Run the following commands:

    ./autogen.sh --prefix=/usr
    make
    sudo make install

Restart the gnome-shell (`[Alt]+[F2]`, `r`)