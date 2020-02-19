/* global wp, _ */

/**
 * Internal dependencies
 */
import {
	Dialog,
} from './';

import {
	OrderAdjustment,
} from './../models';

import {
	NumberFormat,
} from '@easy-digital-downloads/currency';

const number = new NumberFormat();

/**
 * "Add Adjustment" view
 *
 * @since 3.0
 *
 * @class FormAddOrderAdjustment
 * @augments Dialog
 */
export const FormAddOrderAdjustment = Dialog.extend( /** Lends FormAddOrderAdjustment.prototype */ {
	/**
	 * @since 3.0
	 */
	el: '#edd-admin-order-add-adjustment-dialog',

	/**
	 * @since 3.0
	 */
	template: wp.template( 'edd-admin-order-form-add-order-adjustment' ),

	/**
	 * "Add Adjustment" view.
	 *
	 * @since 3.0
	 *
	 * @constructs FormAddOrderAdjustment
	 * @augments Dialog
	 */
	initialize() {
		Dialog.prototype.initialize.apply( this, arguments );

		// Delegate additional events.
		this.addEvents( {
			'change [name="type"]': 'onChangeType',
			'keyup #amount': 'onChangeAmount',
			'keyup #description': 'onChangeDescription',

			'submit form': 'onAdd',
		} );

		// Assign collection from State.
		this.collection = this.options.state.get( 'adjustments' );

		// Create a fresh OrderAdjustment to be added.
		this.model = new OrderAdjustment( {
			id: Math.random( 0, 999 ), // Create a unique ID so it can be added to the Collection.
			type: 'fee',
			amount: '',
		} );

		// Listen for events.
		this.listenTo( this.model, 'change', this.render );
		this.listenTo( this.collection, 'add', this.closeDialog );
	},

	/**
	 * Prepares data to be used in `render` method.
	 *
	 * @since 3.0
	 *
	 * @see wp.Backbone.View
	 * @link https://github.com/WordPress/WordPress/blob/master/wp-includes/js/wp-backbone.js
	 *
	 * @return {Object} The data for this view.
	 */
	prepare() {
		return {
			...this.model.toJSON(),
		};
	},

	/**
	 * Updates the Adjustment when the Type changes.
	 *
	 * @since 3.0
	 *
	 * @param {Object} e Change event
	 */
	onChangeType( e ) {
		const {
			preventDefault,
			target: {
				value: type,
			}
		} = e;

		preventDefault();

		this.model.set( {
			type,
		} );
	},

	/**
	 * Updates the Adjustment when the Description changes.
	 *
	 * @since 3.0
	 *
	 * @param {Object} e Change event
	 */
	onChangeDescription( e ) {
		const {
			preventDefault,
			target: {
				value: description,
			}
		} = e;

		preventDefault();

		this.model.set( {
			description,
		} );
	},

	/**
	 * Updates the Adjustment when the Amount changes.
	 *
	 * @since 3.0
	 *
	 * @param {Object} e Change event
	 */
	onChangeAmount( e ) {
		const {
			preventDefault,
			target: {
				value: amount,
			}
		} = e;

		preventDefault();

		const amountNumber = number.unformat( amount );

		this.model.set( {
			amount,
			subtotal: amountNumber,
			total: amountNumber,
		} );
	},

	/**
	 * Adds an Adjustment to the Adjustments collection.
	 *
	 * @since 3.0
	 *
	 * @param {Object} e Submit event.
	 */
	onAdd( e ) {
		e.preventDefault();

		this.collection.add( this.model );
	},
} );
