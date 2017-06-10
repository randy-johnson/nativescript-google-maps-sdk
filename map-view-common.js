"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_view_1 = require("./map-view");
exports.StyleBase = map_view_1.Style;
var view_1 = require("tns-core-modules/ui/core/view");
var properties_1 = require("tns-core-modules/ui/core/properties");
function onMapPropertyChanged(mapView, oldValue, newValue) {
    if (!mapView.processingCameraEvent)
        mapView.updateCamera();
}
function onPaddingPropertyChanged(mapView, oldValue, newValue) {
    mapView.updatePadding();
}
function paddingValueConverter(value) {
    if (!Array.isArray(value)) {
        value = String(value).split(',').map(function (v) {
            return parseInt(v, 10);
        });
    }
    if (value.length === 4) {
        return value;
    }
    else {
        return [0, 0, 0, 0];
    }
}
var MapViewBase = (function (_super) {
    __extends(MapViewBase, _super);
    function MapViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._markers = new Array();
        _this._shapes = new Array();
        return _this;
    }
    Object.defineProperty(MapViewBase.prototype, "gMap", {
        get: function () {
            return this._gMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapViewBase.prototype, "processingCameraEvent", {
        get: function () {
            return this._processingCameraEvent;
        },
        enumerable: true,
        configurable: true
    });
    MapViewBase.prototype.removeAllPolylines = function () {
        var _this = this;
        this._shapes.forEach(function (shape) {
            if (shape.shape === 'polyline') {
                _this.removeShape(shape);
            }
        });
    };
    MapViewBase.prototype.removeAllPolygons = function () {
        var _this = this;
        this._shapes.forEach(function (shape) {
            if (shape.shape === 'polygon') {
                _this.removeShape(shape);
            }
        });
    };
    MapViewBase.prototype.removeAllCircles = function () {
        var _this = this;
        this._shapes.forEach(function (shape) {
            if (shape.shape === 'circle') {
                _this.removeShape(shape);
            }
        });
    };
    MapViewBase.prototype.notifyMapReady = function () {
        this.notify({ eventName: MapViewBase.mapReadyEvent, object: this, gMap: this.gMap });
    };
    MapViewBase.prototype.notifyMarkerEvent = function (eventName, marker) {
        var args = { eventName: eventName, object: this, marker: marker };
        this.notify(args);
    };
    MapViewBase.prototype.notifyShapeEvent = function (eventName, shape) {
        var args = { eventName: eventName, object: this, shape: shape };
        this.notify(args);
    };
    MapViewBase.prototype.notifyMarkerTapped = function (marker) {
        this.notifyMarkerEvent(MapViewBase.markerSelectEvent, marker);
    };
    MapViewBase.prototype.notifyMarkerInfoWindowTapped = function (marker) {
        this.notifyMarkerEvent(MapViewBase.markerInfoWindowTappedEvent, marker);
    };
    MapViewBase.prototype.notifyShapeTapped = function (shape) {
        this.notifyShapeEvent(MapViewBase.shapeSelectEvent, shape);
    };
    MapViewBase.prototype.notifyMarkerBeginDragging = function (marker) {
        this.notifyMarkerEvent(MapViewBase.markerBeginDraggingEvent, marker);
    };
    MapViewBase.prototype.notifyMarkerEndDragging = function (marker) {
        this.notifyMarkerEvent(MapViewBase.markerEndDraggingEvent, marker);
    };
    MapViewBase.prototype.notifyMarkerDrag = function (marker) {
        this.notifyMarkerEvent(MapViewBase.markerDragEvent, marker);
    };
    MapViewBase.prototype.notifyPositionEvent = function (eventName, position) {
        var args = { eventName: eventName, object: this, position: position };
        this.notify(args);
    };
    MapViewBase.prototype.notifyCameraEvent = function (eventName, camera) {
        var args = { eventName: eventName, object: this, camera: camera };
        this.notify(args);
    };
    return MapViewBase;
}(view_1.View));
MapViewBase.mapReadyEvent = "mapReady";
MapViewBase.markerSelectEvent = "markerSelect";
MapViewBase.markerInfoWindowTappedEvent = "markerInfoWindowTapped";
MapViewBase.shapeSelectEvent = "shapeSelect";
MapViewBase.markerBeginDraggingEvent = "markerBeginDragging";
MapViewBase.markerEndDraggingEvent = "markerEndDragging";
MapViewBase.markerDragEvent = "markerDrag";
MapViewBase.coordinateTappedEvent = "coordinateTapped";
MapViewBase.coordinateLongPressEvent = "coordinateLongPress";
MapViewBase.cameraChangedEvent = "cameraChanged";
exports.MapViewBase = MapViewBase;
exports.latitudeProperty = new properties_1.Property({ name: 'latitude', defaultValue: 0, valueChanged: onMapPropertyChanged });
exports.latitudeProperty.register(MapViewBase);
exports.longitudeProperty = new properties_1.Property({ name: 'longitude', defaultValue: 0, valueChanged: onMapPropertyChanged });
exports.longitudeProperty.register(MapViewBase);
exports.bearingProperty = new properties_1.Property({ name: 'bearing', defaultValue: 0, valueChanged: onMapPropertyChanged });
exports.bearingProperty.register(MapViewBase);
exports.zoomProperty = new properties_1.Property({ name: 'zoom', defaultValue: 0, valueChanged: onMapPropertyChanged });
exports.zoomProperty.register(MapViewBase);
exports.tiltProperty = new properties_1.Property({ name: 'tilt', defaultValue: 0, valueChanged: onMapPropertyChanged });
exports.tiltProperty.register(MapViewBase);
exports.paddingProperty = new properties_1.Property({ name: 'padding', defaultValue: 0, valueChanged: onPaddingPropertyChanged, valueConverter: paddingValueConverter });
exports.paddingProperty.register(MapViewBase);
var UISettingsBase = (function () {
    function UISettingsBase() {
    }
    return UISettingsBase;
}());
exports.UISettingsBase = UISettingsBase;
var PositionBase = (function () {
    function PositionBase() {
    }
    return PositionBase;
}());
exports.PositionBase = PositionBase;
var BoundsBase = (function () {
    function BoundsBase() {
    }
    return BoundsBase;
}());
exports.BoundsBase = BoundsBase;
var MarkerBase = (function () {
    function MarkerBase() {
    }
    return MarkerBase;
}());
exports.MarkerBase = MarkerBase;
var ShapeBase = (function () {
    function ShapeBase() {
    }
    return ShapeBase;
}());
exports.ShapeBase = ShapeBase;
var PolylineBase = (function (_super) {
    __extends(PolylineBase, _super);
    function PolylineBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shape = 'polyline';
        return _this;
    }
    PolylineBase.prototype.addPoint = function (point) {
        this._points.push(point);
        this.reloadPoints();
    };
    PolylineBase.prototype.addPoints = function (points) {
        this._points = this._points.concat(points);
        this.reloadPoints();
    };
    PolylineBase.prototype.removePoint = function (point) {
        var index = this._points.indexOf(point);
        if (index > -1) {
            this._points.splice(index, 1);
            this.reloadPoints();
        }
    };
    PolylineBase.prototype.removeAllPoints = function () {
        this._points.length = 0;
        this.reloadPoints();
    };
    PolylineBase.prototype.getPoints = function () {
        return this._points.slice();
    };
    return PolylineBase;
}(ShapeBase));
exports.PolylineBase = PolylineBase;
var PolygonBase = (function (_super) {
    __extends(PolygonBase, _super);
    function PolygonBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shape = 'polygon';
        return _this;
    }
    PolygonBase.prototype.addPoint = function (point) {
        this._points.push(point);
        this.reloadPoints();
    };
    PolygonBase.prototype.addPoints = function (points) {
        this._points = this._points.concat(points);
        this.reloadPoints();
    };
    PolygonBase.prototype.removePoint = function (point) {
        var index = this._points.indexOf(point);
        if (index > -1) {
            this._points.splice(index, 1);
            this.reloadPoints();
        }
    };
    PolygonBase.prototype.removeAllPoints = function () {
        this._points.length = 0;
        this.reloadPoints();
    };
    PolygonBase.prototype.getPoints = function () {
        return this._points.slice();
    };
    return PolygonBase;
}(ShapeBase));
exports.PolygonBase = PolygonBase;
var CircleBase = (function (_super) {
    __extends(CircleBase, _super);
    function CircleBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shape = 'circle';
        return _this;
    }
    return CircleBase;
}(ShapeBase));
exports.CircleBase = CircleBase;
