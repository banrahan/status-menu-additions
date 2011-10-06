const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Shell = imports.gi.Shell;
const Lang = imports.lang;
const Gettext = imports.gettext.domain('gnome-shell');
const _ = Gettext.gettext;
 
function updateSuspend(object, pspec, item) {
    item.actor.visible = object.get_can_suspend();
}
 
function updateHibernate(object, pspec, item) {
    item.actor.visible = object.get_can_hibernate();
}
 
function onSuspendActivate(item) {
    Main.overview.hide();
 
    this._screenSaverProxy.LockRemote(Lang.bind(this, function() {
        this._upClient.suspend_sync(null);
    }));
}
 
function onHibernateActivate(item) {
    Main.overview.hide();
 
    this._screenSaverProxy.LockRemote(Lang.bind(this, function() {
        this._upClient.hibernate_sync(null);
    }));
}
 
function changeUserMenu()
{
    let addSeparator = false;
    let children = this.menu._getMenuItems();
    for (let i = 0; i < children.length; i++) {
        let item = children[i];
        if (item.label) {
            let _label = item.label.get_text();
            // global.log("menu label: " + _label);
            if (_label == _("Suspend")) {
                item.destroy();
                // check if this is the last item in the list
                if ( i != children.length - 1 ) {
                    addSeparator = true;
                }
            }
        }
    }

    if (addSeparator) 
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
 
    let item = new PopupMenu.PopupMenuItem(_("Suspend"));
    item.connect('activate', Lang.bind(this, onSuspendActivate));
    this._upClient.connect('notify::can-suspend', Lang.bind(this, updateSuspend, item));
    updateSuspend(this._upClient, null, item);
    this.menu.addMenuItem(item);
 
    item = new PopupMenu.PopupMenuItem(_("Hibernate"));
    item.connect('activate', Lang.bind(this, onHibernateActivate));
    this._upClient.connect('notify::can-hibernate', Lang.bind(this, updateHibernate, item));
    updateHibernate(this._upClient, null, item);
    this.menu.addMenuItem(item);
 
    item = new PopupMenu.PopupMenuItem(_("Power Off..."));
    item.connect('activate', Lang.bind(this, function() {
        this._session.ShutdownRemote();
    }));
    this.menu.addMenuItem(item);
}
 
function main(metadata) {
    // Post 3.0  let statusMenu = Main.panel._userMenu;
    let statusMenu = Main.panel._statusmenu;
    changeUserMenu.call(statusMenu);
}