<?php
/**
* This class will connect to the PTV api and get a response
*/
require('config.php');
class PtvApi
{

	private $developerId = DEVID;
	private $key = DEVKEY;
	private $healthcheck;

	function __construct() {
		$date = gmdate('Y-m-d\TH:i:s\Z');
		$healthcheckEndpoint = "/v2/healthcheck?timestamp=" . $date;

		$signedUrl = $this->generateURLWithDevIDAndKey($healthcheckEndpoint);

		$this->healthcheck = $this->getAPI($signedUrl);

	}

	public function checkHealth() {
		$checkArray = json_decode($this->healthcheck, true);
		if($checkArray['securityTokenOK'] != 1) {
			$apiUp = false;
		}
		elseif($checkArray['clientClockOK'] != 1) {
			$apiUp = false;
		}
		elseif($checkArray['memcacheOK'] != 1) {
			$apiUp = false;
		}
		elseif($checkArray['databaseOK'] != 1) {
			$apiUp = false;
		}
		else {
			$apiUp = true;
		}
		return $apiUp;
	}

	public function getAPI($url) {
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT, 4);
		$json = curl_exec($ch);
		if(!$json) {
		    echo curl_error($ch);
		}
		curl_close($ch);

		//print_r(json_decode($json));
		return $json;
	}

	public function search($line) {
		$line = rawurlencode($line);
		$endpoint = "/v2/search/".$line;
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$this->getAPI($signedUrl);
	}

	public function getTimes($stopID) {
		$endpoint = "/v2/mode/0/stop/".$stopID."/departures/by-destination/limit/3";
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$result = $this->getAPI($signedUrl);
		return $result;
	}

	public function getSpecificTimes($lineID,$stopID,$directionID,$limit) {
		$endpoint = "/v2/mode/0/line/".$lineID."/stop/".$stopID."/directionid/".$directionID."/departures/all/limit/".$limit;
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$result = $this->getAPI($signedUrl);
		return $result;
	}

	public function getStops($lineID) {
		$endpoint = "/v2/mode/0/line/".$lineID."/stops-for-line";
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$result = $this->getAPI($signedUrl);
		return $result;
	}

	public function getDisruptions() {
		$endpoint = "/v2/disruptions/modes/metro-train";
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$result = $this->getAPI($signedUrl);
		return $result;
	}

	public function getStoppingPattern($stopID,$runID) {
		$endpoint = "/v2/mode/0/run/".$runID."/stop/".$stopID."/stopping-pattern";
		$signedUrl = $this->generateURLWithDevIDAndKey($endpoint);
		$result = $this->getAPI($signedUrl);
		return $result;
	}

	public function generateURLWithDevIDAndKey($apiEndpoint) {
		// append developer ID to API endpoint URL
		if (strpos($apiEndpoint, '?') > 0)
		{
			$apiEndpoint .= "&";
		}
		else
		{
			$apiEndpoint .= "?";
		}
		$apiEndpoint .= "devid=" . $this->developerId;

		// hash the endpoint URL
		$signature = strtoupper(hash_hmac("sha1", $apiEndpoint, $this->key, false));

		// add API endpoint, base URL and signature together
		return "http://timetableapi.ptv.vic.gov.au" . $apiEndpoint . "&signature=" . $signature;
	}
}
?>
