
#!/bin/bash

# Loop through files in dir
for f in $youruserpath/simorgh/src/app/lib/config/services/*; do 


  service=$(echo "$f" | awk -F '/' '{print $NF}' | awk -F '.' '{print $(NF-1)}')
    echo $service
    # Create iSite URL
    url="https://api.live.bbc.co.uk/isite2-content-reader/content/file?project=l10n-$service&id=bbc-live"

    # Use the updated URL for further processing 
    echo $url

    # Fetch data from api
   xml_response=$(curl --cert-type P12 --cert {$pathToYourP12DevCert} $url)  

    # Extract values using awk
    live_coverage=$(echo "$xml_response" | awk -F'[<>]' '/<live_coverage>/{print $3}')
    breaking=$(echo "$xml_response" | awk -F'[<>]' '/<breaking>/{print $3}')
    posted_at=$(echo "$xml_response" | awk -F'[<>]' '/<posted_at>/{print $3}')
    summary=$(echo "$xml_response" | awk -F'[<>]' '/<summary>/{print $3}')

    # Path to the TypeScript file
    file_path=$f;

    # New translation fields and values
    live_coverage="$live_coverage"
    breaking="$breaking"
    posted_at="$posted_at"
    summary="$summary"

        # Use awk to add the new fields to the translations property
    awk -v live_coverage="$live_coverage" -v breaking="$breaking" -v posted_at="$posted_at" -v summary="$summary" '
      found && /\},?$/ {
        print before
        print "        liveExperiencePage: {"
        print "          live_coverage: \x27" live_coverage "\x27,"
        print "          breaking: \x27" breaking "\x27,"
        print "          posted_at: \x27" posted_at "\x27,"
        print "          summary: \x27" summary "\x27"
        print "        },"
        print after
        found=0
        next
      }
      /gist: .*,/ {
        print "        liveExperiencePage: {"
        print "          live_coverage: \x27" live_coverage "\x27,"
        print "          breaking: \x27" breaking "\x27,"
        print "          posted_at: \x27" posted_at "\x27,"
        print "          summary: \x27" summary "\x27"
        print "        },"
      }
      {
        print
      }
    ' "$file_path" > "${file_path}.tmp"

    # Replace the original file with the updated file
    mv "${file_path}.tmp" "$file_path"

done