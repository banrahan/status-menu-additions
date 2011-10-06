/* -*- mode: js2 - indent-tabs-mode: nil - js2-basic-offset: 4 -*- */
const Lang = imports.lang;
const St = imports.gi.St;

const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const GnomeSession = imports.misc.gnomeSession;

const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

function updateHibernate(object, pspec, item) {
    item.actor.visible = object.get_can_hibernate();
}

function onHibernateActivate(item) {
    Main.overview.hide();

    this._screenSaverProxy.LockRemote(Lang.bind(this, function() {
        this._upClient.hibernate_sync(null);
    }));
}

function addItems() {
    let item;

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
    let statusMenu = Main.panel._statusmenu;
    addItems.call(statusMenu);
}