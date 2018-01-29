<?php
/**
 * EDD Utilities Bootstrap
 *
 * @package     EDD
 * @subpackage  Utilities
 * @copyright   Copyright (c) 2018, Pippin Williamson
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       3.0
 */

/**
 * Class that bootstraps various utilities leveraged in EDD core.
 *
 * @since 3.0
 */
class EDD_Utilities {

	/**
	 * Sets up instantiating core utilities.
	 *
	 * @since 3.0
	 */
	public function __construct() {
		$this->includes();
	}

	/**
	 * Loads needed files for core utilities.
	 *
	 * @since 3.0
	 */
	private function includes() {
		$utils_dir = EDD_PLUGIN_DIR . 'includes/utilities/';

		// Interfaces.
		require_once $utils_dir . 'interface-edd-exception.php';
		require_once $utils_dir . 'interface-static-registry.php';

		// Exceptions.
		require_once $utils_dir . 'class-edd-exception.php';
		require_once $utils_dir . 'exceptions/class-attribute-not-found.php';
		require_once $utils_dir . 'exceptions/class-invalid-argument.php';
		require_once $utils_dir . 'exceptions/class-invalid-parameter.php';

		// Registry.
		require_once $utils_dir . 'class-registry.php';
	}

	/**
	 * Retrieves a given registry instance by name.
	 *
	 * @since 3.0
	 *
	 * @param string $name Registry name.
	 * @return \EDD\Utils\Registry|\WP_Error The registry instance if it exists, otherwise a WP_Error..
	 */
	public function get_registry( $name ) {

		switch( $name ) {
			case 'reports':
				if ( ! did_action( 'edd_reports_init' ) ) {

					_doing_it_wrong( __FUNCTION__, 'The Reports registry cannot be retrieved prior to the edd_reports_init hook.', 'EDD 3.0' );

				} elseif ( class_exists( '\EDD\Reports\Data\Reports_Registry' ) ) {

					$registry = \EDD\Reports\Data\Reports_Registry::instance();

				}
				break;

			case 'reports:endpoints':
				if ( ! did_action( 'edd_reports_init' ) ) {

					_doing_it_wrong( __FUNCTION__, 'The Endpoints registry cannot be retrieved prior to the edd_reports_init hook.', 'EDD 3.0' );

				} elseif ( class_exists( '\EDD\Reports\Data\Endpoint_Registry' ) ) {

					$registry = \EDD\Reports\Data\Endpoint_Registry::instance();

				}
				break;

			default:
				$registry = new \WP_Error( 'invalid_registry', "The '{$name}' registry does not exist." );
				break;
		}

		return $registry;
	}

}
