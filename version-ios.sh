#!/bin/bash
echo "---------------------------------------"
echo "Versioning IOS"
PROJECT_DIR="ios/MyApp.xcodeproj"
PBXPROJ_FILE="project.pbxproj"
PBXPROJ_DIR_FILE="${PROJECT_DIR}/${PBXPROJ_FILE}"

CURRENT_PACKAGE_VERSION=$(cat $PBXPROJ_DIR_FILE | grep MARKETING_VERSION |head -1| sed 's/MARKETING_VERSION =//' | sed 's/;//' | sed 's/\t//g' | sed 's/ //g')
echo "CURRENT PACKAGE VERSION: $CURRENT_PACKAGE_VERSION"
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
echo "TO BE PACKAGE VERSION: $PACKAGE_VERSION"

# BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${PBXPROJ_DIR_FILE}")
# echo $BUILD_NUMBER
BUILD_NUMBER=$(cat $PBXPROJ_DIR_FILE | grep CURRENT_PROJECT_VERSION |head -1| sed 's/CURRENT_PROJECT_VERSION =//' | sed 's/;//' | sed 's/\t//g' | sed 's/ //g')
echo "CURRENT BUILD NUMBER: $BUILD_NUMBER"
BUILD_NUMBER=$(($BUILD_NUMBER + 1))
echo "TO BE BUILD NUMBER: $BUILD_NUMBER"

# Update plist with new values
# /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${PBXPROJ_DIR_FILE}"
# /usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "${PBXPROJ_DIR_FILE}"
sed 's/\(MARKETING\_VERSION = \).*/\1'$PACKAGE_VERSION'/' $PBXPROJ_DIR_FILE > "$PROJECT_DIR/temp1"
sed 's/\(CURRENT\_PROJECT\_VERSION = \).*/\1'$BUILD_NUMBER'/' "$PROJECT_DIR/temp1" > "$PROJECT_DIR/temp2"
mv "$PROJECT_DIR/temp2" $PBXPROJ_DIR_FILE
rm "$PROJECT_DIR/temp1"


UPDATED_PACKAGE_VERSION=$(cat $PBXPROJ_DIR_FILE | grep MARKETING_VERSION |head -1| sed 's/MARKETING_VERSION =//' | sed 's/;//' | sed 's/\t//g' | sed 's/ //g')
echo "UPDATED PACKAGE VERSION: $UPDATED_PACKAGE_VERSION"
UPDATED_BUILD_NUMBER=$(cat $PBXPROJ_DIR_FILE | grep CURRENT_PROJECT_VERSION |head -1| sed 's/CURRENT_PROJECT_VERSION =//' | sed 's/;//' | sed 's/\t//g' | sed 's/ //g')
echo "UPDATED BUILD NUMBER: $UPDATED_BUILD_NUMBER"


git add "${PBXPROJ_DIR_FILE}"
echo "Versioning IOS Done."
echo "---------------------------------------"
